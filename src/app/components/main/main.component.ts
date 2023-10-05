import { UtilsService } from 'src/app/services/utils.service';
import { champions } from './../../../assets/champions';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Champion } from 'src/app/shared/champion';
import { Dropdown } from 'primeng/dropdown';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity:1,transform: 'translateX(0)' })),
      state('out', style({ opacity:0,transform: 'translateX(100%)' })),
      transition('out => in', [
        animate('200ms')
      ]),
      transition('in => out', [
        animate(200)
      ])
    ]),
    trigger('fadeInOut', [
      state('in', style({ opacity:1,transform: 'translateX(0)' })),
      state('out', style({ opacity:0,transform: 'translateX(-100%)' })),
      transition('out => in', [
        animate('200ms 200ms')
      ]),
      transition('in => out', [
        animate(200)
      ])
    ])
  ]
})
export class MainComponent implements OnInit{
  path = './assets/music/';
  ext = '.mp3'
  recentChamps:Champion[] = [];
  audio = new Audio();
  isPlaying:boolean = false;
  championsLocal:Champion[] = champions;
  selectedChampion:Champion;
  currentChampNumb:number;
  resultVisible:boolean = false;
  newChampionNeeded:boolean = false;



  @ViewChild("championDropdown", {static: false}) myDropDown: Dropdown
  @ViewChild("playButton") playButton: ElementRef


  constructor(public utils: UtilsService) {
    this.championsLocal.sort((a, b) => a.name.localeCompare(b.name))
  }

  ngOnInit() {

  }

  nextChampion() {
    this.pauseMusic();
    this.resultVisible = false;
    this.myDropDown.clear(null);

  }

  playMusic() {
      this.audio.play();
      this.isPlaying = true;
  }

  pauseMusic() {
      this.audio.pause();
      this.isPlaying = false;
  }

  generateNewChampion() {
    this.currentChampNumb = this.utils.randomIntFromInterval(1,champions.length);
    this.newChampionNeeded = true;
    let src = this.path+champions[this.currentChampNumb-1].name+this.ext;
    this.audio.src = src;
    console.log(src);
    this.audio.load();
  }


  toggleMusic() {
    if(!this.newChampionNeeded) {
      this.generateNewChampion();
    }
    this.isPlaying?this.pauseMusic():this.playMusic()
  }

  checkIfMatches() {
    if(this.currentChampNumb && this.selectedChampion) {
      if(this.selectedChampion.name == champions[this.currentChampNumb-1].name) {
        console.log('Correct!')
        this.nextChampion();
        this.generateNewChampion();
        this.playButton.nativeElement.classList.toggle('active');
        this.resultVisible = !this.resultVisible;
      } else {
        console.log('Not correct')
      }

    }

    }
}

import { UtilsService } from 'src/app/services/utils.service';
import { champions } from './../../../assets/champions';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity:0,transform: 'translateY(100%)' }),
        animate('200ms')
      ]),
      transition('* => void', [
        animate(200, style({ opacity:0,transform: 'translateY(100%)' }))
      ])
    ]),
    trigger('fadeInOut', [
      state('in', style({ opacity:1 })),
      transition('void => *', [
        style({ opacity:0 }),
        animate('200ms')
      ]),
      transition('* => void', [
        animate(200, style({ opacity:0 }))
      ])
    ])
  ]
})
export class MainComponent {
  path = './assets/music/';
  ext = '.mp3'
  recentChamps:Champion[] = [];
  audio = new Audio();
  isPlaying:boolean = false;
  championsLocal:Champion[] = champions;
  selectedChampion:Champion;
  currentChampNumb:number;
  resultVisible:boolean = false;



  @ViewChild("championDropdown", {static: false}) myDropDown: Dropdown
  @ViewChild("playButton") playButton: ElementRef


  constructor(public utils: UtilsService) {

  }

  nextChampion() {
    this.currentChampNumb = this.utils.randomIntFromInterval(1,champions.length);
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

  nextMusic() {
    let src = this.path+champions[this.currentChampNumb-1].name+this.ext;
    this.audio.src = src;
    this.audio.load();
  }

  checkIfMatches() {
    if(this.currentChampNumb && this.selectedChampion) {
      if(this.selectedChampion.name == champions[this.currentChampNumb-1].name) {
        console.log('Correct!')
        if(this.isPlaying) {
          this.pauseMusic();
        }
        this.nextChampion();
        this.playButton.nativeElement.classList.toggle('active');
        this.resultVisible = !this.resultVisible;
      } else {
        console.log('Not correct')
      }

    }

    }
}

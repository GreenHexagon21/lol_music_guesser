import { UtilsService } from 'src/app/services/utils.service';
import { champions } from './../../../assets/champions';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    trigger('flyInOutReverse', [
      state('in', style({ opacity:1,transform: 'translateX(0)' })),
      state('out', style({ opacity:0,transform: 'translateX(-100%)' })),
      transition('out => in', [
        animate('200ms 100ms')
      ]),
      transition('in => out', [
        animate(200)
      ])
    ]),
    trigger('fadeInOut', [
      state('in', style({ opacity:1})),
      state('out', style({ opacity:0})),
      transition('out => in', [
        animate('200ms')
      ]),
      transition('in => out', [
        animate(200)
      ])
    ]),

  ]
})
export class MainComponent implements OnInit, AfterViewInit{
  path = './assets/music/';
  ext = '.mp3'
  currentNotif = '❌'

  recentChamps:Champion[] = [];

  audio = new Audio();

  isPlaying:boolean = false;

  streakNumber = 0;
  showAnimation = false;

  championsLocal:Champion[] = champions;
  selectedChampion:Champion;

  currentChampNumb:number;
  resultVisible:boolean = false;
  newChampionNeeded:boolean = false;

  currentTitle = "Which champion's theme is this?";

  defaultBackground = "url(./assets/img/Default.png)"
  currentBackground = "url(./assets/img/Ahri.png)"
  backgroundPrefix = "url(./assets/img/"
  backgroundSuffix = ".png)"
  visible: boolean = true;

  showDialog() {
      this.visible = true;
  }

  @ViewChild("championDropdown", {static: false}) myDropDown: Dropdown
  @ViewChild("playButton") playButton: ElementRef
  @ViewChild("body") body: ElementRef
  @ViewChild("status") status: ElementRef

  constructor(public utils: UtilsService) {
    this.championsLocal.sort((a, b) => a.name.localeCompare(b.name))
  }
  ngAfterViewInit(): void {
    this.status.nativeElement.addEventListener('animationend', () => {
      this.showAnimation = false;
    });
  }

  ngOnInit() {
  }


  setBackgroundToDefault() {
    this.body.nativeElement.style.backgroundImage = this.defaultBackground;
  }

  changeBackroundImage() {
    this.constructBackgroundStyle()
    this.body.nativeElement.style.backgroundImage = this.currentBackground;
  }

  constructBackgroundStyle() {
    this.currentBackground = this.backgroundPrefix+champions[this.currentChampNumb-1].name+this.backgroundSuffix
  }

  nextChampion() {
    this.pauseMusic();
    this.resultVisible = false;
    this.myDropDown.clear(null);
    this.currentTitle = "Which champion's theme is this?";
    this.setBackgroundToDefault()

  }

  playMusic() {
      this.showAnimation = false;
      this.audio.play();
      this.isPlaying = true;
      this.playButton.nativeElement.classList.add('active');
  }

  pauseMusic() {
      this.audio.pause();
      this.isPlaying = false;
      this.playButton.nativeElement.classList.remove('active');

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
        this.changeBackroundImage();
        this.currentNotif = '✔'
        this.currentTitle = 'Correct! The theme belongs to '+champions[this.currentChampNumb-1].name;
        this.showAnimation = true;
        this.generateNewChampion();
        this.resultVisible = !this.resultVisible;
        this.streakNumber++;
      } else {
        console.log('Not correct')
        this.showAnimation = true;
        this.streakNumber = 0;
        this.currentNotif = '❌';
      }

    }

    }
}

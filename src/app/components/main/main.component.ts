import { UtilsService } from 'src/app/services/utils.service';
import { champions } from './../../../assets/champions';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Champion } from 'src/app/shared/champion';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
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


  constructor(public utils: UtilsService) {

  }

  nextChampion() {
    this.currentChampNumb = this.utils.randomIntFromInterval(1,champions.length);
  }

  toggleMusic() {
    if(!this.currentChampNumb) {
      this.nextChampion();
    }
    if(!this.isPlaying) {
      let src = this.path+champions[this.currentChampNumb-1].name+this.ext
      this.audio.src = src
      this.audio.load();
      this.audio.play();
      console.log(this.audio.duration);
    } else {
      this.audio.pause();
    }
    this.isPlaying = !this.isPlaying
  }

  checkIfMatches() {

    if(this.selectedChampion.name == champions[this.currentChampNumb-1].name) {
      console.log("You won!");
      this.toggleMusic();
      this.nextChampion();
    } else {
      console.log('Not correct')
    }
  }

}

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


  constructor(public utils: UtilsService) {

  }

  toggleMusic() {
    if(!this.isPlaying) {
      var champNum = this.utils.randomIntFromInterval(1,champions.length);
      let src = this.path+champions[champNum-1].name+this.ext
      this.audio.src = src
      this.audio.load();
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.isPlaying = !this.isPlaying
  }

}

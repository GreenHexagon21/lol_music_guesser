import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  playMusic() {
    let audio = new Audio();
    audio.src = './assets/music/Aatrox.mp3'
    audio.load();
    audio.play();
  }
}

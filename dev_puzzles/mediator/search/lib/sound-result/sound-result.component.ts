import { Component, OnInit, Input } from '@angular/core';
import {SoundResultVO} from './soundResultVO';
import { PlayerService } from '@audio-commons/play-player';

import * as Moment from 'moment';
import * as MomentDurationFormatSetup from 'moment-duration-format';
MomentDurationFormatSetup(Moment);

@Component({
  selector: 'app-sound-result',
  templateUrl: './sound-result.component.html',
  styleUrls: ['./sound-result.component.css']
})
export class SoundResultComponent implements OnInit {
  public state:string = 'stopped';
  public playingSound:any = null;

  @Input() sound: SoundResultVO;
  constructor(
    private playerService: PlayerService) { }

  ngOnInit() {
    console.log('sound:',this.sound);
  }
  
  get soundDuration():string{
    return (<any>Moment.duration(this.sound.duration/1000, "seconds")).format();
  }

  play() {
    console.log("Playing: " + this.sound.preview_url);
    this.state = 'loading';
    this.playingSound = this.playerService.playSoundUrl(
      this.sound.preview_url
      // 'https://mp3d.jamendo.com/download/track/1406279/mp32/'
      // 'http://freesound.org/data/previews/364/364663_3124312-lq.mp3'
      , function(eventName:string){
        switch(eventName){
          case 'playing':
            this.state = 'playing';
            break;
          case 'finished':
            this.state = 'stopped';
            break;
          
        }
      }.bind(this)
    );
  }
  
  stop() {
    this.playingSound.stop();
    this.state = 'stopped';
  }

}

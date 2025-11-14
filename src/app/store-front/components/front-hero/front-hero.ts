import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'front-hero',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './front-hero.html',
})
export class FrontHero {}

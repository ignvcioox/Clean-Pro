import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbar } from "../../components/front-navbar/front-navbar";
import { FrontHero } from "../../components/front-hero/front-hero";
import { FrontFooter } from "../../components/front-footer/front-footer";

@Component({
  selector: 'app-store-front-layout',
  standalone: true,
  imports: [RouterOutlet, FrontNavbar, FrontHero, FrontFooter],
  templateUrl: './store-front-layout.html',
})
export class StoreFrontLayout {}

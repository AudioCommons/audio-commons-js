// @colabo-topichat/f-core

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MaterialModule } from './materialModule';

import {ReactiveFormsModule} from "@angular/forms"; //for the 'Reactive Forms' i.e. 'Model Driven Forms'

import { Dialog1Btn, Dialog2Btn } from './util/dialog';

import { SearchSoundsService } from './searchSounds.service';
import { SoundResultComponent } from './sound-result/sound-result.component';
import { SoundResultsComponent } from './sound-results/sound-results.component';

var moduleDeclarations:any[] = [
    Dialog2Btn,
    Dialog1Btn,
    SoundResultComponent,
    SoundResultsComponent
];

var moduleImports: any[] = [
    RouterModule,

    ReactiveFormsModule,

    FormsModule,
    FlexLayoutModule,

    // Material
    BrowserAnimationsModule,
    MaterialModule,

];

@NgModule({
    declarations: moduleDeclarations,
    imports: moduleImports,
    // exports: moduleImports.concat(moduleDeclarations)
    exports: moduleDeclarations,
    entryComponents: [
        // You must include your dialog class in the list of entryComponents in your module definition so that the AOT compiler knows to create the ComponentFactory for it.
        // @see: https://material.angular.io/components/dialog/overview#aot-compilation
        // Dialog2Btn, Dialog1Btn, //needed otherwise "Runtime Error: No component factory found for Dialog"
    ],
    providers: [
        SearchSoundsService
    ]
})
export class AudioCommonMediatorModule { }
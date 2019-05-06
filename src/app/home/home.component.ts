import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

import * as PptxGenJS from 'pptxgenjs';

@Component({
  selector: 'plop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(
        ':enter', [
          style({ opacity: 0 }),
          animate('400ms', style({ opacity: 1 }))
        ]
      ),
      transition(
        ':leave', [
          style({ opacity: 1 }),
          animate('200ms', style({ opacity: 0 }))
        ]
      )
    ])
  ]
})
export class HomeComponent implements OnInit {

  lyricsForm: FormGroup;

  constructor(
    private changeDetectorChange: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.lyricsForm = this.formBuilder.group({
      title: ['', Validators.required],
      lyrics: ['', Validators.required],
      logo: [null, Validators.required],
      uppercase: [false]
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.lyricsForm.controls.logo.setValue(e.target.result);
        this.changeDetectorChange.markForCheck();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmitLyrics() {
    const pptx = new PptxGenJS();

    const { title, uppercase, logo } = this.lyricsForm.getRawValue();
    let { lyrics } = this.lyricsForm.getRawValue();

    if (uppercase) {
      lyrics = lyrics.toUpperCase();
    }

    const slides = lyrics.split('\n\n');

    slides.forEach(text => {
      const slide = pptx.addNewSlide();

      const lines = text.split('\n').map(line => ({ text: line, options: { breakLine: true } }));

      slide.back = '000000';
      slide.color = 'FFFFFF';
      slide.addText(
        lines,
        { w: '100%', h: '100%', align: 'center', valign: 'top', fontFace: 'Cambria', fontSize: 72 }
      );
      slide.addImage({
        data: logo,
        x: 9, y: 4.5, w: 1, h: 1
      });

    });

    pptx.save(title);
  }

}

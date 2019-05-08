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
          animate('500ms', style({ opacity: 1 }))
        ]
      ),
      transition(
        ':leave', [
          style({ opacity: 1 }),
          animate('0ms', style({ opacity: 0 }))
        ]
      )
    ])
  ]
})
export class HomeComponent implements OnInit {

  lyricsForm: FormGroup;

  backgroundColor = '#000000';
  textColor = '#FFFFFF';

  constructor(
    private changeDetectorChange: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.lyricsForm = this.formBuilder.group({
      title: ['', Validators.required],
      lyrics: ['', Validators.required],
      logo: [null, Validators.required],
      uppercase: [false],
      fontSize: [72, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2)])]
    });
  }

  onClickResetImage() {
    this.lyricsForm.controls.logo.setValue(null);
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

    const backgroundColor = this.backgroundColor.slice(1);
    const textColor = this.textColor.slice(1);

    const { title, uppercase, logo, fontSize } = this.lyricsForm.getRawValue();
    let { lyrics } = this.lyricsForm.getRawValue();

    if (uppercase) {
      lyrics = lyrics.toUpperCase();
    }

    const cover = pptx.addNewSlide();
    cover.back = backgroundColor;
    cover.color = textColor;
    cover.addText(
      title,
      { w: '100%', h: '100%', align: 'center', valign: 'middle', fontFace: 'Cambria', fontSize }
    );

    const slides = lyrics.split('\n\n');

    slides.forEach(text => {
      const slide = pptx.addNewSlide();

      const lines = text.split('\n').map(line => ({ text: line, options: { breakLine: true } }));

      slide.back = backgroundColor;
      slide.color = textColor;
      slide.addText(
        lines,
        { w: '100%', h: '100%', align: 'center', valign: 'top', fontFace: 'Cambria', fontSize }
      );
      slide.addImage({
        data: logo,
        x: 9, y: 4.5, w: 1, h: 1
      });

    });

    pptx.save(title);
  }

}

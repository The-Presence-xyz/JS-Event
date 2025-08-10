import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { ModalService } from './services/modal/modal.service';
import { VisitorService } from './services/visitor/visitor.service';

import { AppComponent } from './app.component';
import { EventComponent } from './pages/event/event.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { ModalComponent } from './components/modal/modal.component';
import { SpeakerComponent } from './components/speaker/speaker.component';
import { ButtonComponent } from './components/button/button.component';

const appRoutes: Routes = [
	{
		path: '',
		component: ComingSoonComponent
	},
	{
		path: 'event',
		component: EventComponent
	},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		EventComponent,
		NotFoundComponent,
		ComingSoonComponent,
		ModalComponent,
		SpeakerComponent,
		ButtonComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: false } // for debug
		),
		SwiperModule,
		AngularFullpageModule,
		FontAwesomeModule,
		LeafletModule.forRoot()
	],
	providers: [
		ModalService,
		VisitorService,
		{
			provide: SWIPER_CONFIG,
			useValue: {}
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

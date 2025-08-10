import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VisitorService } from '../../services/visitor/visitor.service';
import { ModalService } from '../../services/modal/modal.service';
import { faPhoneVolume, faEnvelope, faMapMarkerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
	/*SwiperComponent,
	SwiperDirective,*/
	SwiperConfigInterface,
/*	SwiperScrollbarInterface,
	SwiperPaginationInterface*/
} from 'ngx-swiper-wrapper';

import { tileLayer, map, marker, icon } from 'leaflet/dist/leaflet.js';
// @ts-ignore
import * as data from '../../services/speakers/speakers.json';

const fullPageAnchors = ['main', 'speakers', 'partners', 'registration', 'contacts'];

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
	latitude = 49.425906;
	longitude = 26.984114;

	map: any;
	config: any;
	fullPageApi: any;
	isShowMobileNav: boolean;
	fullPageAnchors = fullPageAnchors;
	faFacebookF = faFacebookF;
	faInstagram = faInstagram;
	faPhoneVolume = faPhoneVolume;
	faEnvelope = faEnvelope;
	faMapMarkerAlt = faMapMarkerAlt;
	faCheckCircle = faCheckCircle;

	facebookLink = 'https://www.facebook.com'; // hard code
	instagramLink = 'https://www.instagram.com'; // hard code

	submittedForm = false;
	registrationForm = new FormGroup({
		firstName: new FormControl('', [
			Validators.required,
			Validators.maxLength(30),
		]),
		lastName: new FormControl('', [
			Validators.required,
			Validators.maxLength(30),
		]),
		email: new FormControl('', [
			Validators.required,
			Validators.email,
		]),
		desire: new FormControl(''),
		acceptPolicy: new FormControl(false, Validators.requiredTrue),
		role: new FormControl('visitor'), // investor
	});

	speakerSwiperProgress = 0;
	speakerSwiperReach = 'beginning'; // end
	speakers: any = (data as any).default;

	public swipeConfig: SwiperConfigInterface = {
		keyboard: true,
		slidesPerView: 'auto',
		breakpoints: {
			// when window width is >= 480px
			353: {
				slidesPerView: 1,
			},
			// when window width is >= 640px
			633: {
				slidesPerView: 2,
			},
			// when window width is >= 1193px
			1193: {
				slidesPerView: 3,
			},
			// when window width is >= 2200px
			2200: {
				slidesPerView: 4,
			}
		},
		navigation: {
			nextEl: '.carousel-next',
			prevEl: '.carousel-previous'
		},
	};

	get firstName() {
		return this.registrationForm.get('firstName');
	}
	get lastName() {
		return this.registrationForm.get('lastName');
	}
	get email() {
		return this.registrationForm.get('email');
	}
	get desire() {
		return this.registrationForm.get('desire');
	}
	get acceptPolicy() {
		return this.registrationForm.get('acceptPolicy');
	}

	constructor(private vs: VisitorService, private modalService: ModalService) {
		this.config = {
			licenseKey: '$ZN&UmV@i7', // TODO move to env
			anchors: fullPageAnchors,
			menu: '#menu',
			verticalCentered: false,
			controlArrows: false,
			sectionsColor: ['#282b3b', '#f1f4f5', '#282b3b', '#f1f4f5', '#282b3b'],
			responsiveWidth: 913,
		};

		this.isShowMobileNav = false;
	}

	getRef(fullPageRef) {
		this.fullPageApi = fullPageRef;
	}

	ngOnInit(): void {
		this.map = map('leaflet-map').setView([this.latitude, this.longitude], 17);

		tileLayer('https://maps.omniscale.net/v2/{id}/style.grayscale/{z}/{x}/{y}.png', {
			maxZoom: 19,
			id: 'publickey-711d87d3', // TODO move to env
			attribution: ''
		}).addTo(this.map);

		const markIcon = icon({
			iconUrl: 'assets/images/mark.png',
			iconSize: [33, 45]
		});

		marker([this.latitude, this.longitude], { icon: markIcon }).addTo(this.map);
	}

	moveToRegistration(role) {
		this.registrationForm.controls.role.setValue(role);
		this.fullPageApi.moveTo('registration');
	}

	onSubmitRegistrationForm() {
		this.submittedForm = true;

		if (this.registrationForm.invalid) {
			return;
		}
		this.vs.createVisitor(this.registrationForm.value);
		this.openModal('registration-success');
		this.registrationForm.reset();
		this.submittedForm = false;
	}

	openModal(id: string) {
		this.modalService.open(id);
	}

	moveTo(index) {
		this.fullPageApi.moveTo(fullPageAnchors[index]);
		if (this.isShowMobileNav) {
			this.toggleMobileNav();
		}
	}

	toggleMobileNav() {
		this.isShowMobileNav = !this.isShowMobileNav;
	}

	swipeSpeakerProgress(progress) {
		this.speakerSwiperProgress = Math.abs(progress) * 100;
	}

	toggleSpeakerSwiperReach(position) {
		this.speakerSwiperReach = position;
	}
}

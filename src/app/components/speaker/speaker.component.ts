import { Component, OnInit, Input } from '@angular/core';
import { Speaker } from '../../services/speakers/speaker';
import { ModalService } from '../../services/modal/modal.service';
import { faFacebookF, faInstagram, faLinkedin, faNodeJs } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-speaker',
	templateUrl: './speaker.component.html',
	styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {
	@Input() speaker: Speaker;

	constructor(private modalService: ModalService) { }

	ngOnInit(): void {}

	openModal(id) {
		this.modalService.open(id);
	}

	getIcon(type) {
		switch (type) {
			case 'facebook':
				return faFacebookF;
			case 'linkedin':
				return faLinkedin;
			case 'instagram':
				return faInstagram;
			default:
				return faNodeJs; // ha-ha
		}
	}

	openInNewTab(url: string): void {
		const newTab = window.open(url, '_blank');
		newTab.opener = null;
	}
}

export interface Speaker {
	id: string;
	firstName: string;
	lastName: string;
	avatarUrl: string;
	position: string;
	company: string;
	socialNetworks: Array<SocialNetwork>;
	description: string;
	topicTitle: string;
	topicPlan: Array<string>;
}

export interface SocialNetwork {
	type: string;
	url: string;
}

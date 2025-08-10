import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Visitor } from './visitor';

@Injectable({
	providedIn: 'root'
})
export class VisitorService {
	visitorsCollectionRef: AngularFirestoreCollection<Visitor>;

	constructor(private afs: AngularFirestore) {
		this.visitorsCollectionRef = this.afs.collection<Visitor>('visitors');
	}

	getVisitors(): Observable<Visitor[]> {
		return this.visitorsCollectionRef.valueChanges();
	}

	createVisitor(visitor: Visitor) {
		// TODO add to visitor additional fields createdDate/editedDate
		this.visitorsCollectionRef.add(visitor);
	}
}

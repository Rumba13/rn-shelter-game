import { makeAutoObservable } from 'mobx';
import { CardType } from '@/src/shared/lib/types/card-type';
import { Card } from '@/src/shared/lib/types/card';

class SortedCardsStore {
  private cardsKit: Card[];

  public setCardsKit(cards: Card[]) {
    this.cardsKit = cards;
  }

  constructor() {
    makeAutoObservable(this);
    this.cardsKit = [];
  }

  public get sortedCards(): { [key in CardType]: Card[] } {
    return {
      'bio': this.cardsKit.filter(card => card.type === 'bio'),
      'action-card': this.cardsKit.filter(card => card.type === 'action-card'),
      'condition-card': this.cardsKit.filter(card => card.type === 'condition-card'),
      'health': this.cardsKit.filter(card => card.type === 'health'),
      'hobby': this.cardsKit.filter(card => card.type === 'hobby'),
      'luggage': this.cardsKit.filter(card => card.type === 'luggage'),
      'phobia': this.cardsKit.filter(card => card.type === 'phobia'),
      'knowledge': this.cardsKit.filter(card => card.type === 'knowledge'),
      'character': this.cardsKit.filter(card => card.type === 'character'),
      'additional-information': this.cardsKit.filter(card => card.type === 'additional-information'),
    };
  };

}

export const sortedCardsStore = new SortedCardsStore();
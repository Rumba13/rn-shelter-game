import { makeAutoObservable, runInAction } from 'mobx';

export class CardsOpenedState {
  constructor(isAllCardsShowed: boolean) {
    makeAutoObservable(this);

    this.isBioCardShowed = isAllCardsShowed;
    this.isHealthCardShowed = isAllCardsShowed;
    this.isHobbyCardShowed = isAllCardsShowed;
    this.isPhobiaCardShowed = isAllCardsShowed;
    this.isCharacterCardShowed = isAllCardsShowed;
    this.isAdditionalInformationCardShowed = isAllCardsShowed;
    this.isKnowledgeCardShowed = isAllCardsShowed;
    this.isLuggageCardShowed = isAllCardsShowed;
    this.isActionCardShowed = isAllCardsShowed;
    this.isConditionCardShowed = isAllCardsShowed;
  }

  public isBioCardShowed: boolean = false;
  public isHealthCardShowed: boolean = false;
  public isHobbyCardShowed: boolean = false;
  public isPhobiaCardShowed: boolean = false;
  public isCharacterCardShowed: boolean = false;
  public isAdditionalInformationCardShowed: boolean = false;
  public isKnowledgeCardShowed: boolean = false;
  public isLuggageCardShowed: boolean = false;
  public isActionCardShowed: boolean = false;
  public isConditionCardShowed: boolean = false;

  public setIsBioCardShowed = (value: boolean) => {
    this.isBioCardShowed = value;
  };
  public setIsHealthCardShowed = (value: boolean) => (this.isHealthCardShowed = value);
  public setIsHobbyCardShowed = (value: boolean) => (this.isHobbyCardShowed = value);
  public setIsPhobiaCardShowed = (value: boolean) => (this.isPhobiaCardShowed = value);
  public setIsCharacterCardShowed = (value: boolean) => (this.isCharacterCardShowed = value);
  public setIsAdditionalInformationCardShowed = (value: boolean) => (this.isAdditionalInformationCardShowed = value);
  public setIsKnowledgeCardShowed = (value: boolean) => (this.isKnowledgeCardShowed = value);
  public setIsLuggageCardShowed = (value: boolean) => (this.isLuggageCardShowed = value);
  public setIsActionCardShowed = (value: boolean) => (this.isActionCardShowed = value);
  public setIsConditionCardShowed = (value: boolean) => (this.isConditionCardShowed = value);
}

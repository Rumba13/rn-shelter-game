import { makeAutoObservable, runInAction } from 'mobx';
import { CardDisplayStatus } from '@/src/shared/lib/types/card-display-status';
import { Alert } from 'react-native';

export class CardsOpenedState {
  constructor(cardDisplayStatus: CardDisplayStatus) {
    makeAutoObservable(this);
    this.bioCardDisplayStatus =
      this.healthDisplayStatus =
      this.hobbyDisplayStatus =
      this.phobiaDisplayStatus =
      this.characterDisplayStatus =
      this.additionalInformationDisplayStatus =
      this.knowledgeDisplayStatus =
      this.luggageDisplayStatus =
      this.actionDisplayStatus =
      this.conditionDisplayStatus =
        cardDisplayStatus;
  }

  public bioCardDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;
  public healthDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;
  public hobbyDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;
  public phobiaDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;
  public characterDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;
  public additionalInformationDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;
  public knowledgeDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;
  public luggageDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;
  public actionDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;
  public conditionDisplayStatus: CardDisplayStatus = CardDisplayStatus.Hidden;

  public setIsBioCardShowed = (value: CardDisplayStatus) => {
    this.bioCardDisplayStatus = value;
  };

  public setIsHealthCardShowed = (value: CardDisplayStatus) => (this.healthDisplayStatus = value);
  public setIsHobbyCardShowed = (value: CardDisplayStatus) => (this.hobbyDisplayStatus = value);
  public setIsPhobiaCardShowed = (value: CardDisplayStatus) => (this.phobiaDisplayStatus = value);
  public setIsCharacterCardShowed = (value: CardDisplayStatus) => (this.characterDisplayStatus = value);
  public setIsAdditionalInformationCardShowed = (value: CardDisplayStatus) =>
    (this.additionalInformationDisplayStatus = value);
  public setIsKnowledgeCardShowed = (value: CardDisplayStatus) => (this.knowledgeDisplayStatus = value);
  public setIsLuggageCardShowed = (value: CardDisplayStatus) => (this.luggageDisplayStatus = value);
  public setIsActionCardShowed = (value: CardDisplayStatus) => (this.actionDisplayStatus = value);
  public setIsConditionCardShowed = (value: CardDisplayStatus) => (this.conditionDisplayStatus = value);
}

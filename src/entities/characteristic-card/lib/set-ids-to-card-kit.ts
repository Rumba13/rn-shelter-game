import { CardKit } from '@/src/shared/lib/types/card-kit';
import { CardType } from '@/src/shared/lib/types/card-type';

type ReturnType = {
  cardsKit: CardKit;
  nextKitId: number;
};

export function setIdsToCardKit(cardsKit: Object, nextId = 1): ReturnType {
  let currentId = nextId;
  const cardsTypesToSetIds: CardType[] = <CardType[]>Object.keys(cardsKit);

  for (let i = 0; i < cardsTypesToSetIds.length; i++) {
    const cardsTypeToSetIds = cardsTypesToSetIds[i];
    // @ts-ignore
    const cards = cardsKit[cardsTypeToSetIds];

    for (let j = 0; j < cards.length; j++) {
      cards[j] = { ...cards[j], id: currentId++ };
    }
  }

  return { cardsKit: <CardKit>cardsKit, nextKitId: currentId };
}

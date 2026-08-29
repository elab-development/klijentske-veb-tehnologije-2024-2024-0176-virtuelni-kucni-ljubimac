export interface IPetAction {
    performAction(): void;
  }
  
  export interface ILjubimacData {
    id: string;
    slika: string;
    naziv?: string;
  }
  
  export class PetModel implements IPetAction {
    id: string;
    slika: string;
    name: string;
    hunger: number;
    happiness: number;
  
    constructor(id: string, slika: string, name: string = '', hunger: number = 3, happiness: number = 3) {
      this.id = id;
      this.slika = slika;
      this.name = name;
      this.hunger = hunger;
      this.happiness = happiness;
    }
  
    eat(): void {
      this.hunger = Math.min(3, this.hunger + 1);
    }
  
    sleep(): void {
      this.happiness = Math.min(3, this.happiness + 1);
    }
  
    decreaseStats(): void {
      this.hunger = Math.max(0, this.hunger - 1);
      this.happiness = Math.max(0, this.happiness - 1);
    }
  
    performAction(): void {
      this.eat();
      this.sleep();
    }
  }
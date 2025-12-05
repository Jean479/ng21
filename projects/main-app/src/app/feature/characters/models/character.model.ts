import { maxLength, minLength, required, schema } from "@angular/forms/signals";

export interface Character {
  id: number;
  name: string;
  height: number;
  mass: number;
}

export type AddingCharacter = Omit<Character, 'id'> & { id?: number };

export const characterSchema = schema<AddingCharacter>(context => {
   required(context.name);
   minLength(context.name, 3);
   maxLength(context.name, 100);
});


export const createDefaultCharacter = (): AddingCharacter => ({
  name: 'Unnamed Character',
  mass: 50,
  height: 100
});

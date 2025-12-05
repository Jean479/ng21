export interface Character {
  id: number;
  name: string;
  height?: number;
  mass?: number;
}

export type AddingCharacter = Omit<Character, 'id'> & { id?: number };

export const createDefaultCharacter = (): AddingCharacter => ({
  name: 'Unnamed Character',
  mass: 50,
  height: 100
});

export class ExpertDetails {
  public id: number
  public image: string;
  public fullName: string;
  public profession: string;
  public rating: number;
  public aspects: string[];
  public skills: string;
  public rate: number;

  constructor(id: number, image: string, fullName: string, profession: string, rating: number, aspects: string[], skills: string, rate: number) {
    this.id = id;
    this.image = image;
    this.fullName = fullName;
    this.profession = profession;
    this.rating = rating;
    this.aspects = aspects;
    this.skills = skills;
    this.rate = rate;
  }
}

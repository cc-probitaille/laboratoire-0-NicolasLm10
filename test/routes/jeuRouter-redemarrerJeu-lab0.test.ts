// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import { Joueur } from '../../src/core/Joueur';
import app from '../../src/app';
import request from 'supertest';
import { JeuDeDes } from '../../src/core/jeuDeDes';
import { jeuRoutes } from "../../src/routes/jeuRouter";


describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeEach(async () => {
    await request(app).post('/api/v1/jeu/demarrerJeu').send({ nom: "test1" });
    await request(app).post('/api/v1/jeu/demarrerJeu').send({ nom: "test2" });
  });

  it("devrait retourner un status 200 et une réponse JSON", async () => {
    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it("devrait réinitialiser les joueurs", async () => {
    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });
});


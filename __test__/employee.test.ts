import request from "supertest";
import jestGlobals from "@jest/globals";
import App from "../src/app";
const { expect, describe, test } = jestGlobals;

const server = (new App()).application

describe('employee', () => {
    test('get all employees', async () => {
        const res = await request(server)
            .get('/api/v1/employees')
        expect(res.statusCode).toBe(200);
    });
});

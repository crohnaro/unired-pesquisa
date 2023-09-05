import nextConnect from "next-connect";
import { get } from "../../src/controllers/questions";

const route = nextConnect();

route.get(get);

export default route;

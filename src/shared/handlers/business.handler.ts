import { RequestEx } from "../../model";

export type BusinessHandler = (req: RequestEx, res: Response) => void;
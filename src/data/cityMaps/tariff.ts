import { buildCityMapFromLayout } from "./layoutTools";
import { TARIFF_LAYOUT } from "./tariffLayout";

export const buildTariffMap = () => buildCityMapFromLayout(TARIFF_LAYOUT);


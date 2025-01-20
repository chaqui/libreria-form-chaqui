export class Catalogs {
  private static readonly LIST = [
    { key: 'DEPARTAMENTOS', value: '7' },
    { key: 'MUNICIPIOS', value: '8' },
    { key: 'ESTADO_CIVIL', value: '6' },
    { key: 'GENERO', value: '5' },
    { key: 'TIPO_CLIENTE', value: '9' },

  ];

  public static getCatalogValue(key: string): string | undefined {
    const catalog = Catalogs.LIST.find(item => item.key === key);
    return catalog ? catalog.value : undefined;
  }
}

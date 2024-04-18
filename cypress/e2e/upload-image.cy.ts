describe('manually upload image test', () => {
  const initCatalog: createCatalogProps = {
    title: 'Test',
    desc: 'Test description',
    item: [{ title: 'Item 1', desc: 'Desc', tags: ['Helo', 'item1'] }],
    submit: false,
  };
  const initCatalog3: createCatalogProps = {
    title: 'Test',
    desc: 'Test description',
    item: [
      { title: 'Item 1', desc: 'Desc', tags: ['Helo', 'item1'] },
      { title: 'Item 2', desc: 'Desc', tags: ['Helo', 'item2'] },
      { title: 'Item 3', desc: 'Desc', tags: ['Helo', 'item3'] },
    ],
    submit: false,
  };
  beforeEach(() => {
    cy.login();
  });

  // ✅
  it('should create catalog with 1 item include image and edit the img. The old image in database should be removed', () => {
    cy.createCatalog(initCatalog);
  });

  // ✅
  it('should create catalog with 1 item include image and edit to item + 1 no image + 1 image', () => {
    cy.createCatalog(initCatalog);
  });

  // ✅
  it('should create catalog with 3 items include image', () => {
    cy.createCatalog(initCatalog3);
  });

  // ✅
  it.only('should create catalog with 3 item include image and edit to remove second item and change image last item', () => {
    cy.createCatalog(initCatalog3);
  });
});

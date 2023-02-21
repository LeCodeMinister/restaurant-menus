const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
    seedItem,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeEach(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    // test('can create a Restaurant', async () => {
    //     // TODO - write test
    //     const restaurant1 = await Restaurant.create(seedRestaurant[0]);
    //     expect(restaurant1.name).toEqual(seedRestaurant[0].name);
    //     expect(restaurant1.location).toEqual(seedRestaurant[0].location);
    //     expect(restaurant1.cuisine).toEqual(seedRestaurant[0].cuisine);
    // });

    // test('can create a Menu', async () => {
    //     // TODO - write test
    //     const menu1 = await Menu.create(seedMenu[0]);
    //     expect(menu1.title).toEqual(seedMenu[0].title);
    // });

    // test('can find Restaurants', async () => {
    //     // TODO - write test
    //     await Restaurant.create(seedRestaurant[0]);
    //     await Restaurant.create(seedRestaurant[1]);
    //     await Restaurant.create(seedRestaurant[2]);
    //     const myRestaurant = await Restaurant.findByPk(3);
    //     expect(myRestaurant.location).toEqual(seedRestaurant[2].location);
    // });

    // test('can find Menus', async () => {
    //     // TODO - write test
    //     await Menu.create(seedMenu[0]);
    //     await Menu.create(seedMenu[1]);
    //     await Menu.create(seedMenu[2]);
    //     const myMenu = await Menu.findByPk(3);
    //     expect(myMenu.title).toEqual(seedMenu[2].title);
    // });

    // test('can delete Restaurants', async () => {
    //     // TODO - write test
    //     await Restaurant.create(seedRestaurant[0]);
    //     await Restaurant.create(seedRestaurant[1]);
    //     await Restaurant.create(seedRestaurant[2]);
    //     const myRestaurant = await Restaurant.findByPk(2);
    //     await myRestaurant.destroy();
    //     await Restaurant.destroy({
    //         where: {
    //             cuisine: "Indian"
    //         }
    //     })
    //     const allRestaurants = await Restaurant.findAll();
    //     expect(allRestaurants.length).toEqual(1);
    // });

    // test('if a Restaurant can have many Menus', async () => {
        
    //     let restaurant1 = await Restaurant.create(seedRestaurant[1]);
    //     let menu1 = await Menu.create(seedMenu[0]);
    //     let menu2 = await Menu.create(seedMenu[1]);

    //     await restaurant1.addMenu(menu1);
    //     await restaurant1.addMenu(menu2);

    //     const restaurant1menus = await restaurant1.getMenus();
    //     expect(restaurant1menus.length).toEqual(2);
    //     expect(restaurant1menus[0].title).toEqual("Breakfast");
    //     expect(restaurant1menus[1].title).toEqual("Lunch");
    // });
    
    test('if a Menu can have many Items, and if a Item can have many Menus', async () => {
        
        let menu1 = await Menu.create(seedMenu[0]);
        let menu2 = await Menu.create(seedMenu[1]);
        let item1 = await Item.create(seedItem[0]);
        let item2 = await Item.create(seedItem[1]);
        let item3 = await Item.create(seedItem[2]);
        
        await menu1.addItems([item1, item2, item3]);
        await menu2.addItem(item1);
        
        const menu1Items = await menu1.getItems();
        const menu2Items = await menu2.getItems();
        
        expect(menu1Items.length).toBe(3);
        expect(menu2Items.length).toBe(1);

        await item1.addMenus([menu1, menu2]);
        await item2.addMenu(menu1);

        const item1Menus = await item1.getMenus();
        const item2Menus = await item2.getMenus();
        const item3Menus = await item3.getMenus();

        expect(item1Menus.length).toBe(2);
        expect(item2Menus.length).toBe(1);
    });
})
const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
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

    test('can create a Restaurant', async () => {
        // TODO - write test
        const restaurant1 = await Restaurant.create(seedRestaurant[0]);
        expect(restaurant1.name).toEqual(seedRestaurant[0].name);
        expect(restaurant1.location).toEqual(seedRestaurant[0].location);
        expect(restaurant1.cuisine).toEqual(seedRestaurant[0].cuisine);
    });

    test('can create a Menu', async () => {
        // TODO - write test
        const menu1 = await Menu.create(seedMenu[0]);
        expect(menu1.title).toEqual(seedMenu[0].title);
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        await Restaurant.create(seedRestaurant[0]);
        await Restaurant.create(seedRestaurant[1]);
        await Restaurant.create(seedRestaurant[2]);
        const myRestaurant = await Restaurant.findByPk(3);
        expect(myRestaurant.location).toEqual(seedRestaurant[2].location);
    });

    test('can find Menus', async () => {
        // TODO - write test
        await Menu.create(seedMenu[0]);
        await Menu.create(seedMenu[1]);
        await Menu.create(seedMenu[2]);
        const myMenu = await Menu.findByPk(3);
        expect(myMenu.title).toEqual(seedMenu[2].title);
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
        await Restaurant.create(seedRestaurant[0]);
        await Restaurant.create(seedRestaurant[1]);
        await Restaurant.create(seedRestaurant[2]);
        const myRestaurant = await Restaurant.findByPk(2);
        await myRestaurant.destroy();
        await Restaurant.destroy({
            where: {
                cuisine: "Indian"
            }
        })
        const allRestaurants = await Restaurant.findAll();
        expect(allRestaurants.length).toEqual(1);
    });
})
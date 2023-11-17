import { Guid } from "@/core";
import { GroceryItem, type GroceryItemProps } from "./grocery-tem";

describe('GroceryItem tests', () => {
  it('should be able to create a grocery item', () => {
    const id = new Guid("123456");
    const groceryItem = new GroceryItem({
      category: "Fruits",
      createdAt: new Date(),
      description: "Banana",
      image: "banana.jpg",
      name: "Banana",
      price: 1.99,
      quantity: 1,
      updatedAt: new Date(),
    }, id);

    expect(groceryItem.isValid()).toBeTruthy();
    expect(groceryItem).toHaveProperty('id');
  });

  it('should be able to update a grocery item', () => {
    const id = new Guid("123456");
    const groceryItem = new GroceryItem({
      category: "Fruits",
      createdAt: new Date(),
      description: "A Banana",
      image: "banana.jpg",
      name: "Banana",
      price: 1.99,
      quantity: 1,
      updatedAt: new Date(),
    }, id);

    const newProps: GroceryItemProps = {
      name: "apple",
      description: "An Apple",
      image: "apple.jpg",
      price: 1.99,
      quantity: 1,
      category: "Fruits",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    groceryItem.update(newProps);

    expect(groceryItem.isValid()).toBeTruthy();
    expect(groceryItem.name).toEqual(newProps.name);
    expect(groceryItem.updatedAt).not.toBeNull();
  });

});
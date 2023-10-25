export interface Category{
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string [];
  description: string;
  category: Category;
  taxes?: number;
}
//Data Transfer Object (DTO): The DTO is an object that is used to
//send data about one object to an API, to create, update, or delete.
//The main idea with DTO's is to generate new interfaces with same 
//fields than original, but adding and omitting parameter or varaibles of it
// without to create a totally new interface.
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
 categoryId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateProductDTO extends Partial<CreateProductDTO>{ }
// "Partial" means that all parameter from a particular model is going to
// be optional


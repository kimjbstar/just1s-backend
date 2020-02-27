import { Brand } from "./models/brand";
import { Item } from "./models/item";
import { sequelize } from "./sequelize";
import { Product } from "./models/product";

const bootstrap = async () => {
  // 나중에 createServer 직전 수행
  await sequelize.sync({ force: true });

  const brands: Brand[] = await Brand.bulkCreate([
    {
      title: "GUCCI",
      description: "구찌.비쌈"
    },
    {
      title: "VALENTINO",
      description: "발렌티노.비쌈"
    }
  ]);

  const product: Product = await Product.create(
    {
      brandId: brands[0].id,
      title: "신발1",
      description: "비쌈",
      items: [
        {
          name: "S",
          stockCount: 1
        },
        {
          name: "M",
          stockCount: 3
        },
        {
          name: "L",
          stockCount: 0
        },
        {
          name: "XL",
          stockCount: 2
        }
      ]
    },
    {
      // association:brand
      include: [Item]
    }
  );

  console.log(product);
};

bootstrap();

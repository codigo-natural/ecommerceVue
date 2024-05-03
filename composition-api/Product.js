app.component("product", {
  template: /* vue-html */ `
  <section class="product">
  <div class="product__thumbnails">
    <div
      v-for="(image, index) in product.images"
      :key="image.index"
      class="thumb"
      :class="{ active: activeImage === index}"
      :style="{ backgroundImage: 'url(' + product.images[index].thumbail + ')'}"
      @click="activeImage = index"
    ></div>
  </div>
  <div class="product__image">
    <img :src="product.images[activeImage].image" :alt="product.name" />
  </div>
</section>
<section class="description">
  <h4>
    {{ product.name.toUpperCase() }} {{ product.stock === 0 ? "😔" :
    "😀"}}
  </h4>
  <badge :product="product"></badge>
  <p class="description_status" v-if="product.stock === 3">
    Quedan pocas unidades
  </p>
  <p class="description_status" v-else-if="product.stock === 2">
    El producto esta por terminarse!
  </p>
  <p class="description_status" v-else-if="product.stock === 1">
    Ultima unidad disponible
  </p>
  <p class="description__price">
    $ {{ new Intl.NumberFormat("es-CO").format(product.price) }}
  </p>
  <p class="description__content">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque velit
    minus quis corrupti laborum nulla delectus atque molestiae enim!
    Amet in perspiciatis autem reiciendis sunt non officiis temporibus
    vel maiores.
  </p>
  <div class="discount">
    <span>Codigo de descuento</span>
    <input
      type="text"
      placeholder="Ingresa tu codigo:"
      @keyup.enter="applyDiscount($event)"
    />
  </div>
  <button :disabled="product.stock === 0" @click="sendToCart()">
    Agregar al carrito
  </button>
</section>
  `,
  props: ["product"],
  emits: ["sendtocart"],

  setup(props, context) {
    const productState = reactive({
      activeImage: 0,
    });

    function sendToCart() {
      context.emit("sendtocart", props.product);
    }

    const discountCodes = ref(["VIERNES", "MONTAÑA"]);

    function applyDiscount() {
      const discountCodeIndex = discountCodes.value.indexOf(event.target.value);
      if (discountCodeIndex >= 0) {
        props.product.price *= 50 / 100;
        discountCodes.value.splice(discountCodeIndex, 1);
      }
    }

    return {
      ...toRefs(productState),

      applyDiscount,

      sendToCart,
    };
  },
});

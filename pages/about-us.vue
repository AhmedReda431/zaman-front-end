<template>
  <div class="max-w-7xl mx-auto m-8 p-4 text-right">
    <!-- Section with Image and Text Side by Side -->
    <div class="flex flex-col-reverse md:flex-row-reverse items-center mb-8 bg-white p-4 shadow-sm">
            <!-- Image Section -->
      <div class="w-full md:w-1/2 h-64 rounded-lg overflow-hidden">
        <img src="https://picsum.photos/800/400" alt="House Image" class="w-full h-full object-cover" />
      </div>
      <!-- Text Section -->
      <div class="w-full md:w-1/2 p-4">
        <h2 class="text-m font-bold text-secondary mb-4 border-b-2 border-secondary inline-block">التعريف بزمن</h2>
        <p class="text-gray-700 leading-relaxed">
         شركة زمن العقارية هى التكامل المستقبلى بين التطوير العقارى والتسويق وتأسست عام 2014 ميلادية حيث قام بتأسيسها الشيخ محمد بن دخيل الله السبيعى والذى يمتلك من الخبرة الكافيةالتى تؤهل لزمن ان تتبوأ مكانتها التى تستحقها بين الشركات الوطنية الكبرى لتكون بذلك نواة الانطلاق نحو أفق التطور فى التخصص السالف ذكره كشركة متخصصة فى العقارات وإدارة المشروعات, كما تحرص زمن على ات تكون الشركة الرائدة فى المجال العقارى حيث تقدم خدمات مميوة لعملاؤها بجودة عالية وتحرص على ارضاء العملاء وتحقيق تطلعاتهم 
        </p>
      </div>

    </div>

    <!-- Icon and Description Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8  m-8">

            <div class="text-center">
        <div class="mb-4">
          <img src="https://picsum.photos/64?random=3" alt="Vision Icon" class="mx-auto w-12 h-12"/>
        </div>
        <h3 class="text-m font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block">رؤيتنا</h3>
        <p class="text-gray-700 leading-relaxed text-right">
          أن نكون روادًا في مجال التسويق والتطوير العقاري في منطقة الشرق الاوسط وشمال افريقيا، عن طريق تطوير مشروعات راقية، تشجع على وجود حياة مستدامة ومكتفية ذاتيا، بالاضافة الى التركيز على جودة الانجازات والخدمات، التي تم تصميمها خصيصا لعملائنا، لتوفير نمط حياة فاخر، مع عوائد استثمارية استثنائية
        </p>
      </div>



      <div class="text-center">
        <div class="mb-4">
          <img src="https://picsum.photos/64?random=2" alt="Mission Icon" class="mx-auto w-12 h-12"/>
        </div>
        <h3 class="text-m font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block">مهمتنا</h3>
        <p class="text-gray-700 leading-relaxed text-right">
          نعمل على خلق تنمية بسيطة، ومبتكرة، ومستدامة ذاتيا، مبنية على أعلى المعايير، نستخدم شغفنا والتزامنا بتقديم خدمات مبتكرة، وجودة فائقة لعملائنا
        </p>
      </div>

      <div class="text-center">
        <div class="mb-4">
          <img src="https://picsum.photos/64?random=1" alt="Value Icon" class="mx-auto w-12 h-12"/>
        </div>
        <h3 class="text-m font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block">قيمتنا</h3>
        <p class="text-gray-700 leading-relaxed text-right">
          نوجه الاهتمام الكامل الى كل تفصيلة، والعمل تحت ضغط الوقت والميزانية، بجانب احترام جميع النظائر وتحقيق الاستدامة.
        </p>
      </div>

    </div>
  </div>



    <div class="max-w-7xl mx-auto p-4 text-right">
<!-- Slider Section -->
<div class="container mx-auto mb-8 p-4" style="background-color: #264642; color: white;">
  <h2 class="text-2xl font-bold mb-6 text-center">الأهداف المنشودة</h2>
  
  <swiper
    :breakpoints="breakpoints"
    navigation
    pagination
    class="mb-8"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index" class="p-4 m-4 border border-gray-300 rounded-lg bg-gray-500 text-white">
      <div class="text-center">
        <div class="text-2xl font-bold mb-2">{{ slide.number }}</div>
        <p class="text-lg">{{ slide.text }}</p>
      </div>
    </swiper-slide>
  </swiper>
</div>

    <!-- Cards Section -->
    <div class="text-center mb-8">
      <h2 class="text-m font-semibold text-secondary mb-4 border-b-2 border-secondary inline-block">
        الاهتمام بعملائنا من خلال
      </h2>
    </div>
    
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <!-- Card 1 -->
  <div class="flex items-center text-right p-4">
    <div class="w-1/4">
      <img src="https://picsum.photos/64?random=4" alt="Innovation Icon" class="mx-auto w-12 h-12 rounded-full"/>
    </div>
    <div class="w-3/4 pl-4">
      <h3 class="text-lg font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block">الابتكار</h3>
      <p class="text-gray-700 leading-relaxed">
        نقدم لعملائنا من خلال مشاريعنا العقارية خدمات مبتكرة وذكية تتيح لهم أسلوب حياة وعمليات تجارية أكثر سهولة.
      </p>
    </div>
  </div>

  <!-- Card 2 -->
  <div class="flex items-center text-right p-4">
    <div class="w-1/4">
      <img src="https://picsum.photos/64?random=5" alt="Commitment Icon" class="mx-auto w-12 h-12 rounded-full"/>
    </div>
    <div class="w-3/4 pl-4">
      <h3 class="text-lg font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block">الالتزام</h3>
      <p class="text-gray-700 leading-relaxed">
        الالتزام نؤمن بأن الالتزام هو جوهر وجودنا. نحرص دائمًا على بناء علاقة قوية مع عملائنا وتلبية احتياجاتهم بكل دقة.
      </p>
    </div>
  </div>

  <!-- Card 3 -->
  <div class="flex items-center text-right p-4">
    <div class="w-1/4">
      <img src="https://picsum.photos/64?random=6" alt="Reputation Icon" class="mx-auto w-12 h-12 rounded-full"/>
    </div>
    <div class="w-3/4 pl-4">
      <h3 class="text-lg font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block">بناء السمعة</h3>
      <p class="text-gray-700 leading-relaxed">
        تسعى زمن في كل الاتجاهات إلى بناء سمعة قوية تتعلق بالجودة والتميز في تقديم خدماتها إلى جميع عملائها.
      </p>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      slides: [
        { number: '1', text: 'فقرة 1: تفاصيل حول الهدف الأول.' },
        { number: '2', text: 'فقرة 2: تفاصيل حول الهدف الثاني.' },
        { number: '3', text: 'فقرة 3: تفاصيل حول الهدف الثالث.' },
        { number: '4', text: 'فقرة 4: تفاصيل حول الهدف الرابع.' },
        { number: '5', text: 'فقرة 5: تفاصيل حول الهدف الخامس.' },
      ],
      breakpoints: {
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
        }
      }
    }
  },
  name: 'ResponsiveSection',
}
</script>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background-color: #768575;
  width: 80%; /* تقليل عرض الشرائح إلى 80% من عرض الحاوية */
  max-width: 300px; /* تحديد أقصى عرض للشرائح */
}

.swiper-pagination-bullet-active {
  background-color: #49685e;
}

.swiper-button-next,
.swiper-button-prev {
  color: rgb(87, 133, 129);
}

.container {
  max-width: 1200px;
}
</style>
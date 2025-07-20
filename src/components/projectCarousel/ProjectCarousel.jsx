import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProjectCard from '../projectCard/ProjectCard';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProjectCarousel.module.css';

const ProjectCarousel = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        {/* Máscaras graduales */}
        <div className={styles.topMask}></div>
        <div className={styles.bottomMask}></div>
        <div className={styles.leftMask}></div>
        <div className={styles.rightMask}></div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          grabCursor={true}
          simulateTouch={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className={styles.mySwiper}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className={styles.swiperSlide}>
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={`${styles.swiperButtonPrev} swiper-button-prev`}></div>
      <div className={`${styles.swiperButtonNext} swiper-button-next`}></div>
    </div>
  );
};

export default ProjectCarousel; 
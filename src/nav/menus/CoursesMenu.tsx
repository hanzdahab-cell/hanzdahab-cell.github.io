import { G, L, type MenuDefinition } from '../NavDropdown';

export const coursesMenu: MenuDefinition = {
  id: 'courses',
  label: 'Courses',
  page: 'courses',
  icon: '/icons/diving-goggles.png',
  wide: true,
  columns: [
    [
      L('About SSI Org', 'home', 'certificates'),
      G('Our Core Courses', [
        L('SSI Freediver', 'course-ssi-freediver-level-1'),
        L('SSI Advanced Freediver', 'course-ssi-advanced-freediver-level-2'),
        L('SSI Performance Freediver', 'course-ssi-performance-freediver-level-3'),
      ]),
      G('Professional Courses', [
        L('SSI Freediving Instructor', 'course-ssi-freediving-instructor-itc'),
        L('SSI Advanced Freediving Instructor', 'course-ssi-advanced-instructor'),
        L('SSI Performance Freediving Instructor', 'courses'),
      ]),
    ],
    [
      G('Specialties', [
        L('SSI Monofin Course', 'course-monofin-technique'),
        L('SSI No Fin Course', 'course-no-fins-cnf'),
        L('SSI Training Techniques', 'course-training-techniques'),
        L('SSI Variable Weight', 'course-variable-weight-sled'),
        L('SSI Marine Ecology', 'course-marine-ecology'),
        L('SSI React Right', 'course-react-right-first-aid'),
        L('Equalization Clinic', 'training', 'training-modules'),
        L('SSI Mouthfill Workshop', 'course-mouthfill-mastery'),
      ]),
    ],
  ],
};

export default coursesMenu;

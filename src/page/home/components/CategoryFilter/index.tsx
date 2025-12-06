import { IoFilterSharp } from 'react-icons/io5';
import styles from './index.module.css';
import { CategoryButton, CategoryButtonDropdown } from './components/CategoryButton';
import type { CategoryTypes } from '../../hook/use-products';
import { useDetectedScreenMode } from '@/hooks';
import { DropdownModelContent, DropdownModelRoot, DropdownModelToggle } from '@/components';
import { MdLaptop } from 'react-icons/md';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { MdOutlineFilterListOff } from 'react-icons/md';
import { FaTabletScreenButton } from 'react-icons/fa6';

export interface CategoryFilterProps {
  handleUpdateFilter: (filter: string) => void;
  filter: CategoryTypes;
}

export const CategoryFilter = ({ handleUpdateFilter, filter }: CategoryFilterProps) => {
  const { isMobileMode } = useDetectedScreenMode({ maxWidth: 549 });

  const handleManagerFilterModel = (category: string) => {
    handleUpdateFilter(category);
  };

  if (isMobileMode) {
    return (
      <DropdownModelRoot
        mode="dropdown"
        referenceId="categoryFilters"
        customClass={styles.category_container_mobile}>
        <DropdownModelToggle mode="dropdown" referenceId="categoryFilters">
          <IoFilterSharp className={styles.icon} />
        </DropdownModelToggle>

        <DropdownModelContent
          mode="dropdown"
          referenceId="categoryFilters"
          className={styles.filters_content_mobile}>
          <CategoryButtonDropdown>
            <CategoryButton category="all" filter={filter} handleClick={handleManagerFilterModel}>
              <MdOutlineFilterListOff />
              Todos
            </CategoryButton>
          </CategoryButtonDropdown>

          <CategoryButtonDropdown>
            <CategoryButton
              category="notebook"
              filter={filter}
              handleClick={handleManagerFilterModel}>
              <MdLaptop /> Notebook
            </CategoryButton>
          </CategoryButtonDropdown>

          <CategoryButtonDropdown>
            <CategoryButton
              category="tablet"
              filter={filter}
              handleClick={handleManagerFilterModel}>
              <FaTabletScreenButton /> Tablet
            </CategoryButton>
          </CategoryButtonDropdown>

          <CategoryButtonDropdown>
            <CategoryButton category="phone" filter={filter} handleClick={handleManagerFilterModel}>
              <MdOutlinePhoneAndroid /> Celular
            </CategoryButton>
          </CategoryButtonDropdown>
        </DropdownModelContent>
      </DropdownModelRoot>
    );
  }

  return (
    <div className={styles.category_container_desktop}>
      <div className={styles.filters_content_desktop}>
        <CategoryButton category="all" filter={filter} handleClick={handleManagerFilterModel}>
          <MdOutlineFilterListOff /> Todos
        </CategoryButton>
        <CategoryButton category="notebook" filter={filter} handleClick={handleManagerFilterModel}>
          <MdLaptop /> Notebook
        </CategoryButton>
        <CategoryButton category="tablet" filter={filter} handleClick={handleManagerFilterModel}>
          <FaTabletScreenButton /> Tablet
        </CategoryButton>
        <CategoryButton category="phone" filter={filter} handleClick={handleManagerFilterModel}>
          <MdOutlinePhoneAndroid /> Celular
        </CategoryButton>
      </div>
    </div>
  );
};

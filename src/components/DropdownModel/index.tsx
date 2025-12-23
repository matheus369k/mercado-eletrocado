import { useLocation } from 'react-router-dom';
import styles from './index.module.css';
import react from 'react';

export type DropdownModelRootProps = react.ComponentProps<'div'> & {
  mode: 'dropdown' | 'model';
  customClass?: string;
  referenceId: string;
};

export type DropdownModelProps = Pick<DropdownModelRootProps, 'referenceId' | 'mode'>;

export const DropdownModelRoot = react.memo(
  ({ children, mode, customClass = '', referenceId, ...props }: DropdownModelRootProps) => {
    const divRef = react.useRef<null | react.ComponentRef<'div'>>(null);
    const [openModal, setOpenModal] = react.useState(false);
    const { pathname } = useLocation();
    const PathRef = react.useRef(pathname);

    react.useEffect(() => {
      if (PathRef.current !== pathname) {
        PathRef.current = pathname;
        setOpenModal(false);
      }

      const dropdownsModels = document.querySelectorAll('[data-dropdown-model][data-open=true]');
      if (dropdownsModels.length > 1) {
        dropdownsModels.forEach((dropdownModel) => {
          closeOldDropdownModelsToOpenNew(dropdownModel);
        });
      }

      const dropdownToggleBtn = divRef.current.querySelector(
        `[data-toggle-${mode}=${referenceId}]`,
      );
      const dropdownItems = divRef.current.querySelectorAll(`[data-item-${mode}=${referenceId}]`);
      const dropdownsCloseBtn = divRef.current.querySelectorAll(
        `[data-close-${mode}=${referenceId}]`,
      );

      dropdownToggleBtn?.addEventListener('click', toggleBtnDropdownModel);
      dropdownsCloseBtn.forEach((dropdownCloseBtn) => {
        dropdownCloseBtn?.addEventListener('click', closeToClickedDropdownModel);
      });
      window?.addEventListener('keyup', keyPressDropdownModel);
      dropdownItems.forEach((dropdownItem) => {
        dropdownItem?.addEventListener('click', closeToClickedDropdownModel);
      });
      window?.addEventListener('click', overDownClickedDropdownModel);

      return () => {
        window?.removeEventListener('click', overDownClickedDropdownModel);
        dropdownToggleBtn?.removeEventListener('click', toggleBtnDropdownModel);
        dropdownsCloseBtn.forEach((dropdownCloseBtn) => {
          dropdownCloseBtn?.removeEventListener('click', closeToClickedDropdownModel);
        });
        window?.removeEventListener('keyup', keyPressDropdownModel);
        dropdownItems.forEach((dropdownItem) => {
          dropdownItem?.removeEventListener('click', closeToClickedDropdownModel);
        });
      };
    }, [openModal, pathname]);

    const closeOldDropdownModelsToOpenNew = (dropDownModel: Element) => {
      const dropDownModelId = dropDownModel.id;
      const dropDownModelMode = dropDownModel.getAttribute('data-dropdown-model');

      if (dropDownModelId === referenceId) {
        const oldDropDownModelToggleOpened = dropDownModel.querySelector(
          `[data-toggle-${dropDownModelMode}=${dropDownModelId}]`,
        );
        oldDropDownModelToggleOpened.dispatchEvent(new Event('click', { bubbles: true }));
      }
    };

    const overDownClickedDropdownModel = (event: Event) => {
      event.stopPropagation();
      const targetElement = event.target as Element;
      const isNotClickedLeaveDropdownModel = !targetElement.closest(
        `[data-content-${mode}=${referenceId}]`,
      );
      if (openModal && isNotClickedLeaveDropdownModel) {
        setOpenModal(false);
      }
    };

    const closeToClickedDropdownModel = () => {
      if (openModal) {
        setOpenModal(false);
      }
    };

    const keyPressDropdownModel = (event: KeyboardEvent) => {
      if (/Escape/i.test(event.code)) {
        if (openModal) {
          setOpenModal(false);
        }
      }
    };

    const toggleBtnDropdownModel = (event: Event) => {
      event.stopPropagation();
      if (openModal) {
        setOpenModal(false);
        return;
      }
      setOpenModal(true);
    };

    const className = mode === 'model' ? styles.model_container : styles.dropdown_container;
    return (
      <div
        {...props}
        id={referenceId}
        data-dropdown-model={mode}
        aria-label={`${mode} ${referenceId} root`}
        className={`${className} ${customClass}`}
        data-open={openModal}
        ref={divRef}>
        {children}
      </div>
    );
  },
);

type DropdownModelToggleProps = react.ComponentProps<'button'> & DropdownModelProps;
export const DropdownModelToggle = ({ mode, referenceId, ...props }: DropdownModelToggleProps) => {
  return (
    <button
      {...props}
      aria-label={`${mode} ${referenceId} toggle`}
      {...{ [`data-toggle-${mode}`]: referenceId }}
    />
  );
};

type DropdownModelCloseProps = react.ComponentProps<'button'> & DropdownModelProps;
export const DropdownModelClose = ({ mode, referenceId, ...props }: DropdownModelCloseProps) => {
  return (
    <button
      {...props}
      aria-label={`${mode} ${referenceId} close`}
      {...{ [`data-close-${mode}`]: referenceId }}
    />
  );
};

type DropdownModelContentProps = react.ComponentProps<'div'> & DropdownModelProps;
export const DropdownModelContent = ({
  mode,
  referenceId,
  ...props
}: DropdownModelContentProps) => {
  return (
    <div
      {...props}
      aria-label={`${mode} ${referenceId} content`}
      {...{ [`data-content-${mode}`]: referenceId }}
    />
  );
};

type DropdownModelItemProps = react.ComponentProps<'div'> & DropdownModelProps;
export const DropdownModelItem = ({ mode, referenceId, ...props }: DropdownModelItemProps) => {
  return (
    <div
      {...props}
      aria-label={`${mode} ${referenceId} item`}
      {...{ [`data-item-${mode}`]: referenceId }}
    />
  );
};

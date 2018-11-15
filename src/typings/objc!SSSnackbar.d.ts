declare class SSSnackbar extends UIView {
  static alloc(): SSSnackbar; // inherited from NSObject

  static appearance(): SSSnackbar; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): SSSnackbar; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(
    trait: UITraitCollection,
    ContainerClass: typeof NSObject
  ): SSSnackbar; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(
    trait: UITraitCollection,
    containerTypes: NSArray<typeof NSObject> | typeof NSObject[]
  ): SSSnackbar; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SSSnackbar; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(
    containerTypes: NSArray<typeof NSObject> | typeof NSObject[]
  ): SSSnackbar; // inherited from UIAppearance

  static new(): SSSnackbar; // inherited from NSObject

  static snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
    message: string,
    actionText: string,
    duration: number,
    actionBlock: (p1: SSSnackbar) => void,
    dismissalBlock: (p1: SSSnackbar) => void
  ): SSSnackbar;

  actionBlock: (p1: SSSnackbar) => void;

  actionIsLongRunning: boolean;

  dismissalBlock: (p1: SSSnackbar) => void;

  duration: number;

  constructor(o: {
    message: string;
    actionText: string;
    duration: number;
    actionBlock: (p1: SSSnackbar) => void;
    dismissalBlock: (p1: SSSnackbar) => void;
  });

  dismiss(): void;

  dismissAnimated(animated: boolean): void;

  initWithMessageActionTextDurationActionBlockDismissalBlock(
    message: string,
    actionText: string,
    duration: number,
    actionBlock: (p1: SSSnackbar) => void,
    dismissalBlock: (p1: SSSnackbar) => void
  ): this;

  show(): void;
}

declare var SSSnackbarVersionNumber: number;

declare var SSSnackbarVersionString: interop.Reference<number>;

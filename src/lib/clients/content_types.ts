import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAboutPieceFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    body: EntryFieldTypes.RichText;
}

export type TypeAboutPieceSkeleton = EntrySkeletonType<TypeAboutPieceFields, "aboutPiece">;
export type TypeAboutPiece<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAboutPieceSkeleton, Modifiers, Locales>;

export interface TypeArticleFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    poster: EntryFieldTypes.AssetLink;
    photos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    body: EntryFieldTypes.RichText;
    creditList?: EntryFieldTypes.Text;
    relatedContent?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeFilmSkeleton | TypeProductSkeleton>>;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export interface TypeCollaboratorFields {
    name: EntryFieldTypes.Symbol;
    tagIdentifier?: EntryFieldTypes.Symbol;
    isADirector?: EntryFieldTypes.Boolean;
    photo?: EntryFieldTypes.AssetLink;
    profession?: EntryFieldTypes.Symbol;
    linkLabel?: EntryFieldTypes.Symbol;
    link?: EntryFieldTypes.Symbol;
}

export type TypeCollaboratorSkeleton = EntrySkeletonType<TypeCollaboratorFields, "collaborator">;
export type TypeCollaborator<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCollaboratorSkeleton, Modifiers, Locales>;

export interface TypeCollaboratorSliderFields {
    collaborators?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCollaboratorSkeleton>>;
}

export type TypeCollaboratorSliderSkeleton = EntrySkeletonType<TypeCollaboratorSliderFields, "collaboratorSlider">;
export type TypeCollaboratorSlider<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCollaboratorSliderSkeleton, Modifiers, Locales>;

export interface TypeContactPersonFields {
    name: EntryFieldTypes.Symbol;
    position?: EntryFieldTypes.Symbol;
    phone?: EntryFieldTypes.Symbol;
    email?: EntryFieldTypes.Symbol;
    category?: EntryFieldTypes.Symbol;
}

export type TypeContactPersonSkeleton = EntrySkeletonType<TypeContactPersonFields, "contactPerson">;
export type TypeContactPerson<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContactPersonSkeleton, Modifiers, Locales>;

export interface TypeContactPointFields {
    title: EntryFieldTypes.Symbol;
    linkLabel: EntryFieldTypes.Symbol;
    link: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
}

export type TypeContactPointSkeleton = EntrySkeletonType<TypeContactPointFields, "contactPoint">;
export type TypeContactPoint<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContactPointSkeleton, Modifiers, Locales>;

export interface TypeFilmFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
    director?: EntryFieldTypes.EntryLink<TypeCollaboratorSkeleton>;
    ralisateur?: EntryFieldTypes.Symbol;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    poster: EntryFieldTypes.AssetLink;
    full?: EntryFieldTypes.Boolean;
    teaser?: EntryFieldTypes.AssetLink;
    animationList?: EntryFieldTypes.AssetLink;
    video: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    screenGrabs?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeScreenGrabSkeleton>>;
    crew?: EntryFieldTypes.RichText;
    description?: EntryFieldTypes.RichText;
    creditList?: EntryFieldTypes.Text;
    relatedContent?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeFilmSkeleton | TypeProductSkeleton>>;
}

export type TypeFilmSkeleton = EntrySkeletonType<TypeFilmFields, "film">;
export type TypeFilm<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeFilmSkeleton, Modifiers, Locales>;

export interface TypeLooseTextFields {
    body: EntryFieldTypes.RichText;
}

export type TypeLooseTextSkeleton = EntrySkeletonType<TypeLooseTextFields, "looseText">;
export type TypeLooseText<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLooseTextSkeleton, Modifiers, Locales>;

export interface TypeNavigationFields {
    identifier: EntryFieldTypes.Symbol;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export interface TypeNavigationLinkFields {
    label?: EntryFieldTypes.Symbol;
    link?: EntryFieldTypes.Symbol;
    external?: EntryFieldTypes.Boolean;
    subLinks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>>;
}

export type TypeNavigationLinkSkeleton = EntrySkeletonType<TypeNavigationLinkFields, "navigationLink">;
export type TypeNavigationLink<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationLinkSkeleton, Modifiers, Locales>;

export interface TypePageFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAboutPieceSkeleton | TypeArticleSkeleton | TypeCollaboratorSkeleton | TypeCollaboratorSliderSkeleton | TypeContactPersonSkeleton | TypeContactPointSkeleton | TypeFilmSkeleton | TypeLooseTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export interface TypePopupFields {
    title?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
    linkLabel?: EntryFieldTypes.Symbol;
    link?: EntryFieldTypes.Symbol;
    poster?: EntryFieldTypes.AssetLink;
}

export type TypePopupSkeleton = EntrySkeletonType<TypePopupFields, "popup">;
export type TypePopup<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePopupSkeleton, Modifiers, Locales>;

export interface TypeProductFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    sizes?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    colors?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    price: EntryFieldTypes.Number;
    soldOut?: EntryFieldTypes.Boolean;
    description: EntryFieldTypes.RichText;
    poster: EntryFieldTypes.AssetLink;
    photos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    relatedContent?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeFilmSkeleton | TypeProductSkeleton>>;
}

export type TypeProductSkeleton = EntrySkeletonType<TypeProductFields, "product">;
export type TypeProduct<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProductSkeleton, Modifiers, Locales>;

export interface TypeScreenGrabFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    time: EntryFieldTypes.Number;
    thumbnail: EntryFieldTypes.AssetLink;
}

export type TypeScreenGrabSkeleton = EntrySkeletonType<TypeScreenGrabFields, "screenGrab">;
export type TypeScreenGrab<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeScreenGrabSkeleton, Modifiers, Locales>;

export interface TypeTagFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    isACollaborator?: EntryFieldTypes.Boolean;
}

export type TypeTagSkeleton = EntrySkeletonType<TypeTagFields, "tag">;
export type TypeTag<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTagSkeleton, Modifiers, Locales>;

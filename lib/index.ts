import Router from "./structure/router";
import Page from "./structure/page";

export { Router, Page };

// Generic Elements
import Container from "./elements/Generic/Container";
import Insert from "./elements/Generic/Insert";
import Caption from "./elements/Generic/Caption";
import Figure from "./elements/Generic/Figure";

export { Container, Insert, Caption, Figure };

// Navigation Elements
import Link from "./elements/Navigation/Link";
import NavLink from "./elements/Navigation/NavLink";

export { Link, NavLink };

// Structuring Elements
import Header from "./elements/Structure/Header";
import Main from "./elements/Structure/Main";
import Footer from "./elements/Structure/Footer";
import Nav from "./elements/Structure/Nav";
import Section from "./elements/Structure/Section";
import Article from "./elements/Structure/Article";
import Aside from "./elements/Structure/Aside";
import Details from "./elements/Structure/Details";

export { Header, Main, Footer, Nav, Section, Article, Aside, Details };

// Text Elements
import Text from "./elements/Text/Text";
import Title from "./elements/Text/Title";

export { Text, Title };

// Table Elements
import Table from "./elements/Table/Table";
import Table_Header from "./elements/Table/TableHeader";
import Table_Body from "./elements/Table/TableBody";
import Table_Footer from "./elements/Table/TableFooter";
import Cell from "./elements/Table/Cell";
import Cell_Header from "./elements/Table/CellHeader";
import Column_Group from "./elements/Table/ColumnGroup";
import Row from "./elements/Table/Row";

export {
  Table,
  Table_Header,
  Table_Body,
  Table_Footer,
  Cell,
  Cell_Header,
  Column_Group,
  Row,
};

//List Elements
import Ordered_List from "./elements/List/OrderedList";
import Unordered_List from "./elements/List/UnorderedList";
import List_Item from "./elements/List/ListItem";
import Description_List from "./elements/List/DescriptionList";
import Description_Term from "./elements/List/DescriptionTerm";
import Term_Definition from "./elements/List/TermDefinition";

export {
  Ordered_List,
  Unordered_List,
  List_Item,
  Description_List,
  Description_Term,
  Term_Definition,
};

// Form Element
import Form from "./elements/Form/Form";
import Label from "./elements/Form/Label";
import Input from "./elements/Form/Input";
import Button from "./elements/Form/Button";
import Dropdown from "./elements/Form/Dropdown";
import Fieldset from "./elements/Form/Fieldset";
import Legend from "./elements/Form/Legend";
import Option from "./elements/Form/Option";
import Options_Group from "./elements/Form/OptionsGroup";
import Text_Area from "./elements/Form/TextArea";

export {
  Form,
  Label,
  Input,
  Button,
  Dropdown,
  Fieldset,
  Legend,
  Option,
  Options_Group,
  Text_Area,
};

// Media Element
import Image from "./elements/Media/Image";
import Picture from "./elements/Media/Picture";
import Audio from "./elements/Media/Audio";
import Video from "./elements/Media/Video";
import Source from "./elements/Media/Source";

export { Image, Picture, Audio, Video, Source };

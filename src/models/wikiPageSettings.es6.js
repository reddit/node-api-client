import Base from './base';

class WikiPageSettings extends Base {
  constructor(props) {
    
    props.pageEditorsList = props.editors.map(function (item) {
      return item.data;
    });

    delete props.editors;

    props.listedInPagesIndex = props.listed;
    delete props.listed;

    props.editingPermissionLevel = WikiPageSettings._permissionLevels[props.permlevel];
    delete props.permlevel;

    super(props);
  }

  toJSON () {
    let props = this.props
    props._type = WikiPageSettings._type;

    return props;
  }

  static _type = 'WikipageSettings';

  static _permissionLevels = {
    0: 'use wiki settings',
    1: 'only approved editors',
    2: 'only Mods',
  }
  
};

export default WikiPageSettings;

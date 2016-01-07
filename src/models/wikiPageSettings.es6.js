import Base from './base';

class WikiPageSettings extends Base {
  _type = 'WikiPageSettings';

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

  static _permissionLevels = {
    0: 'use wiki settings',
    1: 'only approved editors',
    2: 'only Mods',
  }
  
};

export default WikiPageSettings;

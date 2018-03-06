import './bootstrap'
import datepicker from './modules/datepicker'
import sortable from './modules/sortable'

// This is needed for the ToDo List demo
import './todo-list'

// Enable bootstrap dropdowns
$('.dropdown-toggle').dropdown()

// Enable showing file names in Profile update page
import showFileNames from './modules/showFileName'
showFileNames()

// Enable bootstrap dropdowns with hover effect
import dropDownHover from './dropdown-hover'
dropDownHover('.dropdown-hover')

$('.dropdown-toggle').dropdown()
datepicker()
sortable()

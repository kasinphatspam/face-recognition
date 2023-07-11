import utils as ut
import data_task as dt
import recognition_client as rc
from dotenv import load_dotenv

# load global variable from .env file
load_dotenv()

ut.show_menu()
choice = int(input('Your selection : '))
if choice == 0 :
    exit()
elif choice == 1:
    # running face recognition
    rc.run()
    exit()
elif choice == 2:
    # showing data task menu
    ut.datatask_menu()
    dataChoice = int(input('Your selection : '))
    if dataChoice == 0:
        exit()
    elif dataChoice == 1:
        dt.add()
    elif dataChoice == 2:
        dt.remove()
elif choice == 3:
    # advanced setting   
    ut.advanced_setting_menu()
    settingChoice = int(input('Your selection : '))
else:
    # factory resetting
    exit()
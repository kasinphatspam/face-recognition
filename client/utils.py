import os
import utils as ut
import data_task as dt
import recognition as rc

def show_menu():
    os.system('cls||clear')
    print('***************************************************************************')
    print('*                         Face Detection for iNeng                        *')
    print('*                          developed by Gura Team                         *')
    print('***************************************************************************')
    print('[0] - Exit Program.')
    print('[1] - Quick start recognition.')
    print('[2] - Data Task.')
    print('[3] - Advanced setting.')
    print('[4] - Factory reset.')
    choice = int(input('Your selection : '))
    if choice == 0 :
        exit()
    elif choice == 1:
        rc.run()
        exit()
    elif choice == 2:
        ut.datatask_menu()
    elif choice == 3:  
        ut.advanced_setting_menu()
    else:
        exit()


def datatask_menu():
    os.system('cls||clear')
    print('***************************************************************************')
    print('*                              Data Task Menu                             *')
    print('***************************************************************************')
    print('[0] - Go Back to Main Menu.')
    print('[1] - Add.')
    print('[2] - Remove.')
    choice = int(input('Your selection : '))
    if choice == 0:
        exit()
    elif choice == 1:
        dt.add()
    elif choice == 2:
        dt.remove()

def advanced_setting_menu():
    os.system('cls||clear')
    print('***')
    choice = int(input('Your selection : '))

def show_add_titlebar():
    print('***************************************************************************')
    print('*                     Program will capture your face                      *')
    print('*                  Press SPACEBAR on keyboard of capture                  *')
    print('***************************************************************************')

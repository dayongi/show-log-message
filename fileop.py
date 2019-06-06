# coding: utf-8

'''
   1. 操作系统文件调用
   2. python文件对象
   3. fd <--> fobj
   4. tail -f nginx_access_log
'''

import os


LINE_MIN_LENGTH = 77
LINE_MAX_LENGTH = -1
DEFAULT_TAIL_NUM = 10
NEW_FLAG = b'\n'


def tail_seek(fobj, n = DEFAULT_TAIL_NUM):
    "fobj以'rb'形式打开"
    fsize = fobj.seek(0, os.SEEK_END)
    line_count = 0
    chr_count = LINE_MIN_LENGTH + 1

    while line_count < n and chr_count < fsize:
        fobj.seek(-chr_count, os.SEEK_END)
        ch = fobj.read(1)
        while ch != NEW_FLAG and chr_count < fsize:
            chr_count = chr_count + 1
            fobj.seek(-chr_count, os.SEEK_END)
            ch = fobj.read(1)

        if ch == NEW_FLAG:
            line_count = line_count + 1
            if line_count < n: #最后一行不回退
                chr_count = chr_count + LINE_MIN_LENGTH + 1

    chr_count = chr_count - 1 if chr_count < fsize else fsize

    return fobj.seek(-chr_count, os.SEEK_END)


def test_tail_seek():
    fpath = r'/data/logs/openresty/access.log'
    last_n = 10
    fobj = open(fpath, 'rb')
    fpos = tail_seek(fobj, last_n)

    print("postion: ", fpos)
    count = 0
    for line in fobj:
        count = count + 1
        print("%2d: %s" % (count, line.strip().decode('utf-8')))


if __name__ == '__main__':
    test_tail_seek()

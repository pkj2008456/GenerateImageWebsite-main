import os
import json

def list_all_files_and_dirs(folder_path, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = []
    
    result = []

    for root, dirs, files in os.walk(folder_path):
        # 过滤掉排除的目录
        dirs[:] = [d for d in dirs if os.path.join(root, d) not in exclude_dirs]
        
        # 收集当前目录下的所有内容
        for dir_name in dirs:
            dir_path = os.path.join(root, dir_name)
            result.append(dir_path)
        
        for file_name in files:
            file_path = os.path.join(root, file_name)
            result.append(file_path)

    return result

if __name__ == '__main__':
    now_path = os.path.dirname(os.path.abspath(__file__))
    want_to_list = "public"
    folder_path = os.path.join(now_path, want_to_list)
    
    # 指定需要排除的目录
    exclude_dirs = [
        os.path.join(folder_path, 'images'),
        os.path.join(folder_path, 'css'),
        # os.path.join(folder_path, 'env'),
        # os.path.join(folder_path, 'instance'),
        # os.path.join(folder_path, 'logs'),
        # os.path.join(folder_path, 'testapi'),
        # os.path.join(folder_path, '__pycache__'),
        # os.path.join(folder_path,'static')
    ]
    
    result = {"list_file" : list_all_files_and_dirs(folder_path, exclude_dirs),
              "exclude_dirs" : exclude_dirs
    }
    
    # 输出结果为 JSON 格式
    print(json.dumps(result, indent=4))

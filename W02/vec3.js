// Constructor
Vec3 = function(x,y,z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

// Add method
Vec3.prototype.add = function(v)
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

// Sum method
Vec3.prototype.sum = fuction()
{
    return this.x + this.y + this.z;
}

// Min method
Vec3.prototype.min = function()
{
    var min = this.x;
    
    if(min > this.y){
        min = this.y;
    }
    
    if(min > this.z){
        min = this.z;
    }
    
    return min;
}

// Mid method
Vec3.prototype.mid = function()
{
    var min = this.x;
    var mid;
    
    if(min > this.y){
        min = this.y;
    }
    
    if(min > this.z){
        min = this.z;
    }
    
    if(min == this.x){
        if(this.y < this.z){
            mid = this.y;
        }else{
            mid = this.z;
        }
    }else if(min == this.y){
        if(this.x < this.z){
            mid = this.x;
        }else{
            mid = this.z;
        }
    }else if(min == this.z){
        if(this.x < this.y){
            mid = this.x;
        }else{
            mid = this.y;
        }
    }
    
    return mid;
}

// Max method
Vec3.prototype.max = function()
{
    var max = this.x;
    
    if(max < this.y){
        max = this.y;
    }
    
    if(max < this.z){
        max = this.z;
    }
    
    return max;
}
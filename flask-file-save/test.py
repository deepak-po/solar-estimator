import pyproj    
import shapely
import shapely.ops as ops
from shapely.geometry.polygon import Polygon
import functools


geom = Polygon([(0, 0), (0, 10), (10, 10), (10, 0), (0, 0)])
geom_area = ops.transform(
    functools.partial (
        pyproj.transform,
        pyproj.Proj(init='EPSG:4326'),
        pyproj.Proj(
            proj='aea',
            lat1=geom.bounds[1],
            lat2=geom.bounds[3])),
    geom)

# Print the area in m^2
print(geom_area.area)